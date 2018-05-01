using UnityEngine;
using UnityEngine.AI;

public class Clickable : MonoBehaviour {
	public Transform destination;

	public void Click(NavMeshAgent agent) {
		Debug.Log ("Clickable onTriggerEnter");
		// Move the agent to the destination location.
//		agent.SetDestination (destination.position);
	}

	void OnTriggerEnter() {
		Debug.Log ("On Trigger Enter!");
	}
}
