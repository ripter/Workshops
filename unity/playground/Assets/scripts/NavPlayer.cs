using UnityEngine;
using UnityEngine.AI;

// Moves the player using a NavMesh and NavAgent
public class NavPlayer : MonoBehaviour {
	public Transform goal;
	NavMeshAgent agent;

	// Use this for initialization
	void Start () {
		agent = GetComponent<NavMeshAgent> ();
		//agent.destination = goal.position;
	}

	void Update() {
		
		if (Input.GetButton("Fire1")) {
			RaycastHit hit;

			if (Physics.Raycast(Camera.main.ScreenPointToRay(Input.mousePosition), out hit, 100)) {
				agent.destination = hit.point;
			}
		}
	}
}
