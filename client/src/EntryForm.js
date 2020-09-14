import React from "react";
import "./App.css";
import { useForm } from "react-hook-form";
const EntryForm = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form className="entry-form" onsubmit={handleSubmit(onSubmit)}>
      <label>Title</label>
      <input name="title" required ref={register} />

      <label htmlfor="comments">Comments</label>
      <textarea name="comments" rows={3} ref={register} />

      <label htmlfor="description">Description</label>
      <textarea name="description" rows={3} ref={register} />
      <label htmlfor="image">Image</label>
      <input name="image" ref={register} />
      <label htmlfor="visitDate">Visit Date</label>
      <input name="visit Date" type="date" required ref={register} />
      <button>Create a travel log</button>
    </form>
  );
};

export default EntryForm;
