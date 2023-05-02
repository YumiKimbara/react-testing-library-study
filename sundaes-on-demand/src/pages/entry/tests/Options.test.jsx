import { render, screen } from "@testing-library/react";
import Options from "../Options";

/*
 * test for icecream
 */
test("displays image for each scoop option from server", async () => {
  // send props
  render(<Options optionType="scoops" />);

  // when you use async await, make sure to use findBy, not getBy
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

/*
 * test for icecream toppings
 */
test("Displays image for each toppings option from server", async () => {
  render(<Options optionType="toppings" />);

  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);

  const imageTitles = toppingImages.map((element) => {
    return element.alt;
  });
  expect(imageTitles).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});
