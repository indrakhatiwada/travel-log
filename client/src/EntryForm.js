import React, { useState } from "react";
import "./App.css";
import { useForm } from "react-hook-form";
import { createLogEntry } from "./API.js";

const EntryForm = ({ location, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      const created = await createLogEntry(data);
      onClose();

      console.log(created);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }

    Error && setLoading(false);
  };

  return (
    <form className="entry-form" onSubmit={handleSubmit(onSubmit)}>
      {error ? <h3>{error}</h3> : null}
      <label>Title</label>
      <input name="title" required ref={register} />

      <label htmlFor="comments">Comments</label>
      <textarea name="comments" rows={3} ref={register} />

      <label htmlFor="description">Description</label>
      <textarea name="description" rows={3} ref={register} />
      <label htmlFor="image">Image</label>
      <input name="image" ref={register} />
      <label htmlFor="visitDate">Visit Date</label>
      <input name="visitDate" type="date" required ref={register} />
      <button disabled={loading}>
        {loading ? "Loading..." : "Create Entry"}
      </button>
    </form>
  );
};

export default EntryForm;
