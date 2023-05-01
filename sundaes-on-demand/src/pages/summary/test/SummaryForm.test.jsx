import { render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";
/*
 * make sure to setup eslint and prettier
 * delete App.test.js because we need more specific test files
 * npm i msw -> install Mock Service Worker(開発中にモックAPIを作成するために使用。テスト時に実際のAPIを呼ばなくて良いから便利)
 */

test("Initial conditions", () => {
  // render SummaryForm
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
  // confirm the checkbox is not checked
  expect(checkbox).not.toBeChecked();

  const confirmButton = screen.getByRole("button", { name: "Confirm order" });
  // confirm the button is disabled
  expect(confirmButton).toBeDisabled();
});

test("Checkbox enables button on first click and disables on second click", async () => {
  // create a userEvent instance
  const user = userEvent.setup();
  // render SummaryForm
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
  const confirmButton = screen.getByRole("button", { name: "Confirm order" });

  // fireEventはユーザーがWebページ上で何らかのアクション（クリック、入力など）を実行した場合と同じように、Reactコンポーネントに対してアクションを実行する。]
  // fireEventはDOM eventだがuserEventはfull interactionである。
  // userEventは非同期処理であるのでawaitを使わないといけない！
  // confirm to enable button when the checkbox was clicked
  await user.click(checkbox);
  expect(confirmButton).toBeEnabled();

  // confirm to disable button when the checkbox was clicked
  await user.click(checkbox);
  expect(confirmButton).toBeDisabled();
});

test("popover responds to hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  // this will be null.
  const nullPopover = screen.queryByText(
    "No ice cream will actually be delivered"
  );
  // check if nullPopOver doesn't exist in the document
  expect(nullPopover).not.toBeInTheDocument();

  const termsAndConditions = screen.getByText("Terms and Conditions");
  // popover will appear when we mouse over
  await user.hover(termsAndConditions);
  const popover = screen.getByText("No ice cream will actually be delivered");
  expect(popover).toBeInTheDocument();

  // popover will appear when we mouse out
  await user.unhover(termsAndConditions);
  expect(popover).not.toBeInTheDocument();
});
