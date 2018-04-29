using UnityEngine;

public class OnTriggerPickup : MonoBehaviour {
	// When triggered, destroy the game object we are attached to.
	void OnTriggerEnter (Collider collider) {
		Destroy (gameObject);
	}
}
