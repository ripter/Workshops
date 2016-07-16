<banner if={visible}>
  <p>
    {message}
  </p>
  <button onClick={onClick}>{buttonText}</button>

  <style>
    banner {
      position: fixed;
      top: 50%;
      width: 100%;
      background-color: #66cc33;
      box-shadow: 0px 3px #347e0f;
    }

    banner > p {
      font-size: 20pt;
      text-align: center;
      line-height: 3;
    }
  </style>
</banner>
