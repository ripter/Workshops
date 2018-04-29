using UnityEngine;
using UnityEngine.SceneManagement;

public class StartGameOnTrigger : MonoBehaviour {

	void OnTriggerEnter (Collider collider) {
		Invoke ("LoadFirstLevel", 1f);
	}
		
	public void LoadFirstLevel() {
		// 0 is the intro screen, 1 is the first level.
		SceneManager.LoadScene (1);
	}
}
