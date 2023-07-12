import * as Location from "expo-location";
import { PermissionStatus } from "expo-location";
import { useState } from "react";
import * as ExpoTaskManager from "expo-task-manager";
const LOCATION_TASK_NAME = "background-location";
function useLocation() {
	const [errMsg, setErrMsg] = useState<string | undefined>(undefined);
	const requestLocation = async () => {
		const { status } = await Location.requestForegroundPermissionsAsync();
		if (status === Location.PermissionStatus.GRANTED) {
			const { status } =
				await Location.requestBackgroundPermissionsAsync();
			if (status === PermissionStatus.GRANTED) {
			}
		}
	};
	const startBackgroundLocation = async () => {
		// Don't track position if permission is not granted
		const { granted } = await Location.getBackgroundPermissionsAsync();
		if (!granted) {
			console.log("location tracking denied");
			return;
		}

		// Make sure the task is defined otherwise do not start tracking
		const isTaskDefined = ExpoTaskManager.isTaskDefined(LOCATION_TASK_NAME);
		if (!isTaskDefined) {
			console.log("Task is not defined");
			return;
		}

		// Don't track if it is already running in background
		const hasStarted = await Location.hasStartedLocationUpdatesAsync(
			LOCATION_TASK_NAME
		);
		if (hasStarted) {
			console.log("Already started");
			return;
		}

		await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
			// For better logs, we set the accuracy to the most sensitive option
			accuracy: Location.Accuracy.BestForNavigation,
			// Make sure to enable this notification if you want to consistently track in the background
			showsBackgroundLocationIndicator: true,
			foregroundService: {
				notificationTitle: "Location",
				notificationBody: "Location tracking in background",
				notificationColor: "#fff",
			},
		});
	};

	const stopBackgroundLocation = async () => {
		const hasStarted = await Location.hasStartedLocationUpdatesAsync(
			LOCATION_TASK_NAME
		);
		if (hasStarted) {
			await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
			console.log("Location tacking stopped");
		}
	};

	return {
		errMsg,
		LOCATION_TASK_NAME,
		requestLocation,
		stopBackgroundLocation,
		startBackgroundLocation,
	};
}

ExpoTaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
	if (error) {
		console.error(`error: ${error.message}`);
		return;
	}
	if (data) {
		const { locations } = data as unknown as any;
		const { timestamp, coords } = locations[0] as Location.LocationObject;
		console.log(coords);
		// console.log(JSON.parse(coords));
	}
});

export { useLocation };
