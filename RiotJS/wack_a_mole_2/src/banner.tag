<banner>
  <div if={visible}>
    <p>
      {message}
    </p>
  </div>

  <script type="babel">
    this.visible = true;
    this.message = 'Game Over';
  </script>
  <style>
    banner > div {
      color: #0E3E14;
      background-color: #2ECC40;
      font-size: 20pt;
      height: 80px;
    }

    banner > div > p {
      text-align: center;
      line-height: 3;
    }
  </style>
</banner>
