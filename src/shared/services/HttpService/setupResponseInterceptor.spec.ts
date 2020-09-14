import MockAdapter from "axios-mock-adapter";
import { HttpService, IHttpService, initHttpService } from "./HttpService";

describe("ResponseInterceptor", () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    initHttpService(
      {
        state: {
          app: { config: { api: { baseUrl: "" } } },
          auth: {
            accessToken: "foo",
            refreshToken: "bar"
          }
        },
        commit: jest.fn(),
        dispatch: jest.fn(() => Promise.resolve())
      } as any,
      {
        push: jest.fn()
      } as any
    );

    mockAxios = new MockAdapter(HttpService);
  });

  test("dispatch auth/refreshToken when response status is 401", async () => {
    mockAxios.onGet("/me").replyOnce(401);
    mockAxios.onGet("/me").replyOnce(200, { username: "foo" });

    await HttpService.get("/me");
    const actual = (<Required<IHttpService>>HttpService).store.dispatch;
    const expected = "auth/refreshToken";

    expect(actual).toBeCalledWith(expected);
  });

  test("not dispatch auth/refreshToken when it is already refreshing", async () => {
    mockAxios.onGet("/me").replyOnce(401);
    mockAxios.onGet("/protected-route").replyOnce(401);

    mockAxios.onGet("/me").replyOnce(200, { username: "foo" });
    mockAxios.onGet("/protected-route").replyOnce(200, { username: "foo" });

    await Promise.all([
      HttpService.get("/me"),
      HttpService.get("/protected-route")
    ]);
    const actual = (<Required<IHttpService>>HttpService).store.dispatch;

    expect(actual).toBeCalledTimes(1);
  });

  test("reject all pending requests when refresh-token failed", async () => {
    (<Required<IHttpService>>(
      HttpService
    )).store.state.auth.accessToken = undefined;

    mockAxios.onGet("/me").replyOnce(401);
    mockAxios.onGet("/protected-route").replyOnce(401);

    try {
      await Promise.all([
        HttpService.get("/me"),
        HttpService.get("/protected-route")
      ]);
    } catch (e) {
      const actual = (<Required<IHttpService>>HttpService).store.dispatch;

      expect(actual).toBeCalledTimes(1);
    }
  });

  test("reject promise if server returns an error not related to auhentication", async () => {
    mockAxios.onGet("/me").replyOnce(500);

    try {
      await HttpService.get("/me");
    } catch (e) {
      const actual = e.response.status;
      const expected = 500;

      expect(actual).toEqual(expected);
    }
  });

  test("redirect to sign-in page when auth/refreshToken fails", async () => {
    (<Required<IHttpService>>HttpService).store.dispatch = jest.fn(() =>
      Promise.reject({})
    );

    mockAxios.onGet("/me").replyOnce(401);
    mockAxios.onGet("/protected-route").replyOnce(401);

    try {
      await Promise.all([
        HttpService.get("/me"),
        HttpService.get("/protected-route")
      ]);
    } catch (e) {
      const actual = (<Required<IHttpService>>HttpService).router.push;
      const expected = "/";

      expect(actual).toBeCalledWith(expected);
    }
  });
});
