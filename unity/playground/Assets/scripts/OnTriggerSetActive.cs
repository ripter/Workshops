using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class OnTriggerSetActive : MonoBehaviour {
	public GameObject target;
	public bool active;

	void OnTriggerEnter (Collider collider) {
		target.SetActive (active);
	}
}
