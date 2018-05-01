using UnityEngine;
using UnityEngine.AI;
using UnityStandardAssets.Characters.ThirdPerson;

// Moves the player using a NavMesh and NavAgent
public class MoveAgentToMousePosition : MonoBehaviour
{
	public ThirdPersonCharacter character;
	NavMeshAgent agent;

	void Start ()
	{
		// Get the NavMeshAgent component instance that is on our gameObject.
		agent = GetComponent<NavMeshAgent> ();
		agent.updateRotation = false; // Let the animation control rotation.
	}

	void Update ()
	{
		// Fire1 is mouse left click.
		if (Input.GetButton ("Fire1")) {
			RaycastHit hit;

			if (Physics.Raycast (Camera.main.ScreenPointToRay (Input.mousePosition), out hit, 100)) {
				// did the user click the ground or a clickable object?
				if (hit.collider.isTrigger) {
					Clickable clickable = hit.collider.GetComponent<Clickable> ();
					Debug.Log ("Clickable Dest: " + clickable.name);
					agent.destination = clickable.destination.position;
				} else {
					Debug.Log ("Floor Click");
					agent.destination = hit.point;
				}

			}
		}

		// If we have not reached the destination yet
		if (agent.remainingDistance > agent.stoppingDistance) {
			// move the player using the animation.
			character.Move (agent.desiredVelocity, false, false);
		} else {
			// Stop moving
			character.Move (Vector3.zero, false, false);
		}
	}
}
