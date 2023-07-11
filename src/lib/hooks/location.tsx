import Location from "expo-location";
import { useState } from "react";

function useLocation() {
	const [errMsg, setErrMsg] = useState<string | undefined>(undefined);
	const LOCATION_TASK_NAME = "background-location";
	const requestLocation = async () => {
		const { status } = await Location.requestForegroundPermissionsAsync();
		if (status === Location.PermissionStatus.GRANTED) {
			const { status } =
				await Location.requestBackgroundPermissionsAsync();
		}
	};

	return { errMsg, LOCATION_TASK_NAME, requestLocation };
}
