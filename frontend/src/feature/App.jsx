import { BrowserRouter, Route, Routes } from "react-router";
import { MainLayout } from "../Common/MainLayout.jsx";
import { BoardList } from "./board/BoardList.jsx";
import { BoardAdd } from "./board/BoardAdd.jsx";
import { BoardDetail } from "./board/BoardDetail.jsx";
import { BoardEdit } from "./board/BoardEdit.jsx";
import { MemberAdd } from "./member/MemberAdd.jsx";
import { MemberList } from "./member/MemberList.jsx";
import { MemberDetail } from "./member/MemberDetail.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<BoardList />} />
          <Route path="board/add" element={<BoardAdd />} />
          <Route path="board/:id" element={<BoardDetail />} />
          <Route path="board/edit" element={<BoardEdit />} />
          <Route path="signup" element={<MemberAdd />} />
          <Route path="member/list" element={<MemberList />} />
          <Route path="/member" element={<MemberDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
