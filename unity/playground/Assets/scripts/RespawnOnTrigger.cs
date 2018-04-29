using UnityEngine;
using UnityEngine.SceneManagement;

public class RespawnOnTrigger : MonoBehaviour {

	void OnTriggerEnter (Collider collider) {
	  // Wait 1 second, then reload.
		Invoke ("ReloadScene", 1f);
	}

	// Reloads the current scene
	public void ReloadScene() {
		Scene activeScene = SceneManager.GetActiveScene ();
		SceneManager.LoadScene (activeScene.buildIndex);
	}
}
