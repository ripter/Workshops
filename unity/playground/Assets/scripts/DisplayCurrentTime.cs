using UnityEngine;
using UnityEngine.UI;

public class DisplayCurrentTime : MonoBehaviour {
	public Text display;

	// Update is called once per frame
	void Update () {
		display.text = ((int)Time.timeSinceLevelLoad).ToString ("D") + " seconds";
	}
}
