using UnityEngine;

public class CameraPlayer : MonoBehaviour {
	public Transform player;
	public Vector3 playerOffset;


	// FixedUpdate is called before physics
	void FixedUpdate () {
		transform.position = player.position + playerOffset;
	}
}
