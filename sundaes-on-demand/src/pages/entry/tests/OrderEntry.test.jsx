import { render, screen, waitFor } from "@testing-library/react";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";

// only 1 test and ignore if there are other tests
test.only("handles error for scoops and toppings routes", async () => {
  // reset handler
  server.resetHandlers(
    rest.get("http://localhose:3030/scoops", (req, res, ctx) => {
      res(ctx.status(500));
    }),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
      res(ctx.status(500));
    })
  );

  render(<OrderEntry />);

  // waitFor will wait any period of time
  // 下記のawait screen...はtoppingとicecreamの二つの通信が終わってから実行したいが、
  // 一つの通信が終わった後に実行しエラーになる可能性がある。そのためwaitForでwrapし待つようにする。
  // findByも非同期処理だが、それだけでは足りないらしく、waitForの非同期処理も追加で必要。
  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});

// this will be skipped
test.skip("not a real test", () => {});
