# Storybook con Componente Web nativo

## Creación de proyecto

Iniciar proyecto indicando el flag <code>--type html</code>

```sh
npx storybook init --type html
```

Es necesario tener ya un proyecto. Si aún no existe puedes iniciarlo con <code>npm init</code> para que el generador de storybook pueda escribir en el <code>package.json</code> todas las dependencias y script

## Estructura de proyecto en storybook

La estructura puede ser personalizada al gusto, aunque el scaffolding es similar a muchos otros proyectos

### Ubicación de stories en storybook

El scaffolding de storybook, por lo que he podido ver en proyectos del tipo <code>Web Components</code>, <code>Angular</code> y <code>Html</code>, es el mismo. Carpeta <code>src/stories</code> que contiene las <code>stories</code>.

Los ficheros para la creación de stories tiene que terminar con el siguiente nombre <code>.stories.js</code>

La instalación se genera con datos de ejemplo: ficheros de estilos CSS, componentes, recursos estáticos en <code>src/stories/assets</code> y fichero Readme. Estos ficheros son de ejemplo que se pueden eliminar. Los componentes creados de ejemplo para proyecto tipo HTML no son WebComponents nativos que se genera mediante clases que extiendan de <code>HTMLElement</code> y por tanto no se define la etiqueta <code>customElements.define("mi-componente", MiComponente)</code>. Lo que se hace en los Componentes de ejemplo es el tradicional <code>.createElement()</code>

### Ficheros de configuración de storybook

En la raiz del proyecto se crea una carpeta <code>.storybook</code> que por defecto contiene dos ficheros. En la DOC se puede ver que se pueden ir añadiendo más ficheros según el grado de personalización. Si más adelante tengo tiempo (y ganas :)) escribiré más sobre este tema en proyecto con Angular

<ul class="list-bullets">
  <li><code>main.js</code>: contiene configuraciones. Por defecto indica las ruta de las stories y ficheros .mdx, así como los <code>addons</code> instalados</li>
  <li><code>preview.js</code>: para la configuración de <code>actions</code> y <code>controls</code></li> del previsualizador de stories
</ul>

Hasta aquí lo básico, no hay que tocar mucho. En mi caso eliminé los ejemplos, ajuste de rutas a las stories y añadido un nuevo <a href="https://github.com/ljcl/storybook-addon-cssprops" target="_blank" rel="noopener">addons de Custom Properties de CSS</a> para que se pueda personalizar las stories mediante variables CSS

## Creación de stories con Web Components en storybook

### Ubicación de los Web Components

Lo primero comentar que he usado tres Web Components que hice hace tiempo y quería ver que tal sería incorporarlos en storybook. Pongo enlace a entradas de Blog:

<ul class="list-bullets">
  <li><a href="/blog/webcomponent-canvas-particles/">Componente Web con Partículas en lienzo Canvas</a></li>
  <li><a href="/blog/tab-slots-web-component/">Tab Web component con Slots</a></li>
  <li><a href="/blog/webcomponent-tooltip-notification/">Webcomponent para tooltip notification</a></li>
</ul>

Los ficheros de los componentes están ubicados en <code>src/js</code>. Lo único que necesitamos es su ruta para poder incluirlos en las stories

### Estructura de las stories en Storybook

Aunque tengo tres componentes sólo comentaré cosas sobre el componente Tabs que tiene más cosas de las que hablar. Este componente tiene tres etiquetas con atributos opciones por si se quieren personalizar

```html
<iga-tab active="2" justify="space-evenly" style="--color-tab-background-active: #e66c4d"></iga-tab>
<iga-tab-item></iga-tab-item>
<iga-tab-panel></iga-tab-panel>
```

La estructura básica que he aplicado es (que es lo mínimo):

```javascript
import { IgaTab } from '../js/tab/iga-tab';

export default {
  title: 'Tab/Tab',
  component: IgaTab,
};

const Template = ({...args}) => `<html-tags />`;

export const Tab1 = Template.bind({});
Tab1.args = {};
```

El primer bloque es la importación de nuestro WebComponent e importación de otros componentes, librerías, datos... que fuera necesarios

El segundo bloque es la definición básica (o no tan básica) de la story

El tercer bloque es la creación de una Template que sirva como modelo para las diferentes stories que necesitemos

El cuarto bloque son cada una de las stories personalizadas que necesitemos crear basándonos en la/s Template/s que tengamos creadas y personalizadas según interese mediente argumentos

Entrando ahora en detalle sobre código, el fichero <code>src/stories/IgaTab.stories.js</code> contiene todo el sistema de Tabs: contenedor + botones + contenidos

Se obtiene el WebComponent y un array con objetos para los botones y los contenidos de los Tabs

```javascript
import { IgaTab } from '../js/tab/iga-tab';
import datas from './data/tab-content'
const data = datas.items
```

Definición general de la storie

```javascript
export default {
  // Nombre con el que aparece en el sidebar izquierdo (cada barra '/' indentará en el tree)
  title: 'Tab/Tab',
  // Nombre de nuestro componente
  component: IgaTab,
  // Se pueden definir las entradas o inputs que puede tener nuestro componente, que se muestran en los 'Controls'
  // En este caso, será una lista 'select' con las diferentes opciones
  argTypes: {
    justify: {
      options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
      control: { type: 'select' },
    },
  },
  // Configuración de los Addons
  parameters: {
    // Hemos habilitado uno que permite 'jugar' con Custom Property de CSS
    // Más info: https://github.com/ljcl/storybook-addon-cssprops
    cssprops: {
      // No se añaden los '--'
      "color-tab-background-active": {
        category: 'Optional',
        value: "tomato",
        description: "BG button active color",
      },
      "color-tab-foreground": {
        category: 'Optional',
        value: "#414144",
        description: "FOREGROUND button color",
      },
      "trans-dur": {
        category: 'Optional',
        value: "0.2s",
        description: "Transition duration (ms/s units)",
      },
      "trans-del": {
        category: 'Optional',
        value: "0.1s",
        description: "Transition delay (ms/s units)",
      },
    }
  },
};
```

Creación de Template base para cada una de las stories de nuestro componente. No tendría porque añadirse HTML. Por ejemplo, usando Angular en muchas ocasiones no es necesario salvo que queramos envolver el componente o similar. En nuestro caso hacemos uso de las tres tags que hemos creado

Para acceder a los parámetros lo hacemos mediante <code>args</code>

```javascript
const Template = ({...args}) => `
<iga-tab justify="${args.justify}" active="${args.active}">
  <div slot="group-tabs" role="tablist">
    ${args.data.map(tab => `<iga-tab-item><span>${tab.label}</span></iga-tab-item>`).join("")}
  </div>
  <main slot="group-panels" class="tabs__panels">
    ${args.data.map(tab => `<iga-tab-panel>${tab.content}</span></iga-tab-panel>`).join("")}
  </main>
</iga-tab>
`;
```

Finalmente hacemos uso de la Template personalizando los atributos que queramos para la carga por defecto. Hemos añadido los datos de ejemplo <code>data</code> que tenemos en un fichero independiente para no "ensuciar" mucho el código

```javascript
export const Tab1 = Template.bind({});
Tab1.args = {
  active: 0,
  justify: 'flex-start',
  data
};
```

Con todo hasta aquí, ya tenemos una storie completa del Componente Tab. Pero se pueden hacer stories más pequeñas. Muestro snippet comentado de dos stories para los botones del Tab

```javascript
export default {
  // Nombre con el que aparece en el sidebar izquierdo (cada barra '/' indentará en el tree)
  title: 'Tab/TabItem',
  // Nombre de nuestro componente
  component: IgaTabItem,
  // Configuración de los Addons
  parameters: {
    // Hemos habilitado uno que permite 'jugar' con Custom Property de CSS
    // Más info: https://github.com/ljcl/storybook-addon-cssprops
    cssprops: {
      // No se añaden los '--'
      "color-tab-background-active": {
        category: 'Optional',
        value: "red",
        description: "BG button active color",
      },
      "color-tab-foreground": {
        category: 'Optional',
        value: "#414144",
        description: "FOREGROUND button color",
      },
    }
  },
};

// Template de nuestra storie a la que añadimos parámetros para que tenga
// datos y sea personalizable
const Template = ({...args}) => `<iga-tab-item>${args?.label}</iga-tab-item>`;

// Storie 1
export const TabItem1 = Template.bind({});
TabItem1.args = {
  label: 'Tab ítem demo1'
};

// Storie 2
export const TabItem2 = Template.bind({});
TabItem2.args = {
  label: 'Tab ítem 2'
};
```

## Arrancar proyecto en local

Aunque puedes ver el <a href="../../experimentos/storybook/?path=/story/canvas-canvasdraw--canvas-1">build en el siguiente enlace</a> también puedes <a href="https://github.com/ivanalbizu/storybook-native-webcomponent" target="_blank" rel="noopener">clonarte el repo</a> y hacer las pruebas localmente

Instalación de dependencias

```sh
npm install
```

Lanzar storybook

```sh
npm run storybook
```

Ver los web components independiente a storybook

```sh
npm start
```
