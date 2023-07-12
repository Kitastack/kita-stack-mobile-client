import { router, useSegments } from "expo-router";
import React, {
	useEffect,
	createContext,
	useContext,
	useReducer,
	useState,
} from "react";
import { $useStorage } from "@/hooks/useStorage";

const intialState: any = null;

export type IContext = {
	state: typeof intialState;
	dispatch: React.Dispatch<any>;
	login?: (_val: any) => void;
	logout?: () => void;
};

export const AuthContext = createContext<IContext>({
	state: intialState,
	dispatch: () => null,
});

export function useAuth() {
	return useContext(AuthContext);
}

export function authReducer(
	state: any,
	action: { type: string; payload?: any }
) {
	switch (action.type) {
		case "login": {
			return action?.payload;
		}
		case "logout": {
			state = null;
			router.push("/sign_in");
		}
		// default: {
		//   throw new Error(`Unhandled action type: ${action.type}`);
		// }
	}
}

export default function Provider(props: any) {
	const [$isReady, $setReady] = useState(false);
	const [state, dispatch] = useReducer(authReducer, intialState);
	const segments = useSegments();

	// mounted
	useEffect(() => {
		(async function _() {
			const _userFromStorage = await $useStorage("user");
			if (_userFromStorage?._id)
				dispatch({ type: "login", payload: _userFromStorage });
			router.push("/sign_in");
			$setReady(true);
		})();
	}, []);

	// updated based on mounted
	useEffect(() => {
		if ($isReady) {
			const inAuthGroup = segments[0] === "(auth)";
			const inTabsGroup = segments[0] === "(tabs)";
			const inCustomGroup = segments[0] === "(custom)";
			console.log("ready", $isReady, state?._id);
			if (!state?._id && !inAuthGroup) {
				router.push("/sign_in");
			} else if (state?._id && inAuthGroup) {
				router.push("/tolong");
			}

			// else if (state?._id && inAuthGroup) {
			//   router.push("/tolong");
			// }
		}
	}, [state, segments, $isReady]);

	return (
		<AuthContext.Provider
			value={{
				state,
				dispatch,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
}
