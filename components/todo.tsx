"use client";

import { Checkbox, IconButton, Spinner } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { deleteTodo, updateTodo } from "actions/todo-actions";
import { queryClient } from "config/ReactQueryClientProvider";
import { useState } from "react";

export default function Todo({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [completed, setCompleted] = useState(todo.completed);
  const [title, setTitle] = useState(todo.title);

  const updateTodoMutation = useMutation({
    mutationFn: () =>
      updateTodo({
        id: todo.id,
        title,
        completed,
      }),
    onSuccess: () => {
      setIsEditing(false);
      queryClient.invalidateQueries({   
        queryKey: ["todos"],
      });
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: () => deleteTodo(todo.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  return (
    <div className="w-full flex items-center gap-1">
      <Checkbox
        checked={completed}
        onChange={async (e) => {
          await setCompleted(e.target.checked);
          await updateTodoMutation.mutate();
        }}
        crossOrigin=""  // 기본값으로 빈 문자열 추가
        onPointerEnterCapture={() => {}}  // 빈 함수로 처리
        onPointerLeaveCapture={() => {}}  // 빈 함수로 처리
      />


      {isEditing ? (
        <input
          className="flex-1 border-b-black border-b pb-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      ) : (
        <p className={`flex-1 ${completed && "line-through"}`}>{title}</p>
      )}

      {isEditing ? (
        <IconButton
        onClick={async () => {
          await updateTodoMutation.mutate();
        }}
        placeholder="Button placeholder" // 필요 시 추가
        onPointerEnterCapture={() => console.log("Pointer entered")} // 필요 시 추가
        onPointerLeaveCapture={() => console.log("Pointer left")} // 필요 시 추가
      >
        {updateTodoMutation.isPending ? (
          <Spinner
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        />
        ) : (
          <i className="fas fa-check" />
        )}
      </IconButton>
      
      ) : (
        <IconButton
          onClick={() => setIsEditing(true)}
          onPointerEnterCapture={() => {}}  // 빈 함수 추가
          onPointerLeaveCapture={() => {}}  // 빈 함수 추가
          placeholder=""  // 기본값 추가
        >
          <i className="fas fa-pen" />
        </IconButton>

      )}
      <IconButton
        onClick={() => deleteTodoMutation.mutate()}
        onPointerEnterCapture={() => {}}  // 빈 함수로 처리
        onPointerLeaveCapture={() => {}}  // 빈 함수로 처리
        placeholder=""  // 빈 문자열 추가
      >
        {deleteTodoMutation.isPending ? (
          <Spinner
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        />
        ) : (
          <i className="fas fa-trash" />
        )}
      </IconButton>
    </div>
  );
}