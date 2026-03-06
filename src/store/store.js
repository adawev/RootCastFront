import { configureStore } from "@reduxjs/toolkit";

import weathercheck from "./reducers/Weather";

export default configureStore({
    reducer: {
        weathercheck,
    },
});
