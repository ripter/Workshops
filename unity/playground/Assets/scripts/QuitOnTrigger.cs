using UnityEngine;

public class QuitOnTrigger : MonoBehaviour {

	void OnTriggerEnter (Collider collider) {
		Invoke ("QuitApplication", 1f);
	}

	// Reloads the current scene
	public void QuitApplication() {
		Application.Quit ();
	}
}
