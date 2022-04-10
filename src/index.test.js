import app from "./app";
import server from "./index";

jest.mock("./app", () => ({ listen: jest.fn() }));
describe("start server", () => {
  it("should start to listen on given port", () => {
    expect(app.listen).toHaveBeenCalled();
    expect(server).toBe(app);
  });
});
