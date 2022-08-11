export default {
  items: [
    {
      label: 'Tab label',
      content: `
        <div slot="panel">
          <h1>This is panel 1</h1>
          <p>
            1 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia
            deleniti quisquam similique a rerum.
          </p>
          <p>
            2 Lorem ipsum dolot maxime commodi, harum distinctio nulla
            quibusdam dolorum consequatur minus. Quibusdam, sit?
          </p>
        </div>
      `
    },
    {
      label: 'Tab 2',
      content: `
        <div slot="panel">
          <p>
            3 Lorem, ipsum dolor sit actetur adipisicing elit. Quia deleniti
            quisquam similique a rerum.
          </p>
          <p>
            4 Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
            maxime commodi, harum distinctio nulla quibusdam dolorum
            consequatur minus. Quibusdam, sit?
          </p>
        </div>
      `
    },
    {
      label: 'Last Tab',
      content: `<div slot="panel"><p>Last tab</p></div>`
    }
  ]
}