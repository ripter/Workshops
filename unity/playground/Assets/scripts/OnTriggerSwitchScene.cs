﻿using UnityEngine;
using UnityEngine.SceneManagement;

public class OnTriggerSwitchScene : MonoBehaviour {
	public float delay = 1f;
	public string sceneName = "start";

	void OnTriggerEnter (Collider collider) {
		// Wait 1 second, then load the next level.
		Invoke ("LoadNextScene", delay);
	}

	// Reloads the current scene
	public void LoadNextScene() {
		SceneManager.LoadScene (sceneName);
	}
}
