import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Task from "./Task";
import TaskCreate from "./TaskCreate";
import TaskUpdate from "./TaskUpdate";
import CategoryCreate from "./CategoryCreate";
import Checklist from "./Checklist";
import ChecklistUpdate from "./ChecklistUpdate";
import CategoryUpdate from "./CategoryUpdate";
import ChecklistCreate from "./ChecklistCreate";
import Category from "./Category";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Task />} />
        <Route path="create" element={<TaskCreate />} />
        <Route path="update/:id" element={<TaskUpdate />} />
        <Route path="category" element={<Category />} />
        <Route path="categoryCreate" element={<CategoryCreate />} />
        <Route path="categoryUpdate/:id" element={<CategoryUpdate />} />
        <Route path="checklist/:id" element={<Checklist />} />
        <Route path="checklistCreate/:id" element={<ChecklistCreate />} />
        <Route path="checklistUpdate/:id" element={<ChecklistUpdate />} />
      </Routes>
    </div>
  );
}

export default App;
