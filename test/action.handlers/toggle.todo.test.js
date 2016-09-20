import toggleTodo from "../../lib/action.handlers/toggle.todo";
import assert from "assert";

describe("toggleTodo() action", () => {
  it("marks an uncompleted todo as completed", () => {
    const state = {
      todos: [
        {
          id: "666",
          text: "wash dishes",
          completed: false,
          timestamp: "2016-09-08T01:47:00.490+0000"
        },
        {
          id: "667",
          text: "walk the dog",
          completed: false,
          timestamp: "2016-09-08T01:48:00.490+0000"
        }
      ]
    };

    const action = {
      type: "goggle",
      id: "666"
    };

    assert.deepEqual(
      toggleTodo(state, action),
      {
        todos: [
          {
            id: "666",
            text: "wash dishes",
            completed: true,
            timestamp: "2016-09-08T01:47:00.490+0000"
          },
          {
            id: "667",
            text: "walk the dog",
            completed: false,
            timestamp: "2016-09-08T01:48:00.490+0000"
          }
        ]
      }
    );
  });

  it("marks a completed todo back to uncompleted", () => {
    const state = {
      todos: [
        {
          id: "666",
          text: "wash dishes",
          completed: true,
          timestamp: "2016-09-08T01:47:00.490+0000"
        },
        {
          id: "667",
          text: "walk the dog",
          completed: false,
          timestamp: "2016-09-08T01:48:00.490+0000"
        }
      ]
    };

    const action = {
      type: "toggleTodo",
      id: "666"
    };

    assert.deepEqual(
      toggleTodo(state, action),
      {
        todos: [
          {
            id: "666",
            text: "wash dishes",
            completed: false,
            timestamp: "2016-09-08T01:47:00.490+0000"
          },
          {
            id: "667",
            text: "walk the dog",
            completed: false,
            timestamp: "2016-09-08T01:48:00.490+0000"
          }
        ]
      }
    );
  });

  it("does nothing when the todo cannot be found", () => {
    const state = {
      todos: [
        {
          id: "667",
          text: "walk the dog",
          completed: false,
          timestamp: "2016-09-08T01:48:00.490+0000"
        }
      ]
    };

    const action = {
      type: "toggleTodo",
      id: "666"
    };

    assert.deepEqual(
      toggleTodo(state, action),
      {
        todos: [
          {
            id: "667",
            text: "walk the dog",
            completed: false,
            timestamp: "2016-09-08T01:48:00.490+0000"
          }
        ]
      }
    );
  });
});

