using UnityEngine;

// Moves the player forward and allows horizontal maneuvering.
public class MovePlayer : MonoBehaviour {
	public Rigidbody playerBody;
	public float forwardSpeed = 1000f;
	public float maneuverSpeed = 500f;

	float horzAxis;

	// listen for user input
	void Update() {
		horzAxis = Input.GetAxis ("Horizontal");
	}

	// We update physics in FixedUpdate
	void FixedUpdate () {
		// Move the player forward.
		playerBody.AddForce (0, 0, forwardSpeed * Time.deltaTime, ForceMode.VelocityChange);

		// Move based on user input
		playerBody.AddForce ((maneuverSpeed * horzAxis) *  Time.deltaTime, 0, 0, ForceMode.VelocityChange);
	}
}
