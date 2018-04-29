using UnityEngine;
using UnityEngine.AI;

// Moves the player using a NavMesh and NavAgent
public class NavPlayer : MonoBehaviour {
	NavMeshAgent agent;

	void Start () {
		// Get the NavMeshAgent component instance that is on our gameObject.
		agent = GetComponent<NavMeshAgent> ();
	}

	void Update() {
		// Fire1 is mouse left click.
		if (Input.GetButton("Fire1")) {
			RaycastHit hit;

			if (Physics.Raycast(Camera.main.ScreenPointToRay(Input.mousePosition), out hit, 100)) {
				agent.destination = hit.point;
			}
		}
	}
}
