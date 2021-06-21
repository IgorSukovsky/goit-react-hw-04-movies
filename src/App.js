import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./components/Header/Header";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import routes from "./routes";
import cc from "./App.module.css";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MovieDetailsPage = lazy(() =>
  import("./pages/MovieDetailsPage/MovieDetailsPage")
);
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const App = () => {
  return (
    <div className={cc.bacgraund}>
      <Header />
      <Suspense
        fallback={
          <Loader
            type="ThreeDots"
            color="#3f51b5"
            height={100}
            width={100}
            timeout={3000}
          />
        }
      >
        <Switch>
          <Route exact path={routes.home} component={HomePage} />
          <Route
            path={routes.details}
            render={(props) => {
              return <MovieDetailsPage {...props} />;
            }}
          />
          <Route
            path={routes.movies}
            render={(props) => <MoviesPage {...props} />}
          />
          <Route component={HomePage} />
        </Switch>
      </Suspense>
    </div>
  );
};

export default App;
