// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

import { server } from "./mocks/server";

// すべてのテストが実行される前に、serverオブジェクトのlisten()メソッドを呼び出して、モックサーバーを起動する。
beforeAll(() => server.listen());

// 各テストが完了するたびに、serverオブジェクトのresetHandlers()メソッドを呼び出して、モックサーバーの状態をリセットすることを意味します。
// これにより、異なるテスト間でモックサーバーの状態が混在することがなくなります。
afterEach(() => server.resetHandlers());

// close server when test was finished
afterAll(() => server.close());
