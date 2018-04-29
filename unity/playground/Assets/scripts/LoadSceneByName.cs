using UnityEngine;
using UnityEngine.SceneManagement;

public class LoadSceneByName : MonoBehaviour {
	public void LoadScene(string sceneName) {
		Debug.Log ("Re-loading level because of trigger");
		SceneManager.LoadScene(sceneName);
	}
}
