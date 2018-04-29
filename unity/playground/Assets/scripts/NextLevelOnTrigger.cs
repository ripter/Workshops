using UnityEngine;
using UnityEngine.SceneManagement;

public class NextLevelOnTrigger : MonoBehaviour {

	void OnTriggerEnter (Collider collider) {
		// Wait 1 second, then load the next level.
		Invoke ("LoadNextLevel", 1f);
	}

	// Reloads the current scene
	public void LoadNextLevel() {
		Scene activeScene = SceneManager.GetActiveScene ();
		SceneManager.LoadScene (activeScene.buildIndex + 1);
	}
}
