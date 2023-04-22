import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import HomeComponent from "./components/home";
import ResultComponent from "./components/search";
import DetailComponent from "./components/detail";
import IngredientDetail from "./components/detail/ingredient-detail";
import LoginComponent from "./components/authentication";
import ProfileComponent from "./components/profile";
import EditProfileComponent from "./components/profile/edit-profile";
import AdminPageComponent from "./components/admin";
import {Provider} from "react-redux";
import authReducer from "./components/authentication/auth-reducer";
import commentReducer from "./components/comments/comment-reducer";
import bookmarkReducer from "./components/bookmarks/bookmark-reducer";
import usersReducer from "./components/admin/usersReducer";
import {configureStore} from "@reduxjs/toolkit";
import NavigationComponent from "./components/navigation";

const store = configureStore({
    reducer: {
        user: authReducer,
        userList: usersReducer,
        comments: commentReducer,
        bookmarks: bookmarkReducer
    }
});

function App() {
  return (
      <Provider store={store}>
          <BrowserRouter>
              <NavigationComponent/>
              <div className="container">
                  <Routes>
                      <Route path="/" element={<HomeComponent />} />
                      <Route path="/results/" element={<ResultComponent />} />
                      <Route path="/results/:criteria" element={<ResultComponent />} />
                      <Route path="/detail/:rid" element={<DetailComponent />} />
                      <Route path="/detail/:rid/:iid" element={<IngredientDetail />} />
                      <Route path="/login/" element={<LoginComponent />} />
                      <Route path="/profile/" element={<ProfileComponent />} />
                      <Route path="/profile/:uname" element={<ProfileComponent />} />
                      <Route path="/edit-profile" element={<EditProfileComponent />} />
                      <Route path="/manage-users" element={<AdminPageComponent />}/>
                  </Routes>
              </div>
          </BrowserRouter>
      </Provider>
  );
}

export default App;
