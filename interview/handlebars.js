<html>
  <head>
    <style>
      body {
        background-color: #1d2126;
        color: white;
      }
    </style>
  </head>
  <body>
    <div id="app"></div>
    <script id="template1" type="text/handlebars">
      <div>
        <ul>
        <li>{{nested.one.two}}</li>
        <button id="button">{{button_name}} {{click_count}}</button>
      </div>
    </script>
    <script>
      const render = (template, params) => {

      }

      const template = document.querySelector('#template1').innerText;
      const params = {
        click_count: 0,
        button_name: 'submit',
        nested: { one: { two: 'item nested' } }
      };

      const elApp = window.app;
      const component = document.createElement('div');
      component.innerHTML = render(template, params);
      elApp.appendChild(component);
    </script>
  </body>
</html>
