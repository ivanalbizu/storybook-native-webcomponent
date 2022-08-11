class IgaTabItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  static get observedAttributes() {
    return ["tab"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "tab":
        this.tab = newValue || 0;
        break;
    }
  }
  connectedCallback() {
    this.addEventListener("click", this._clickedEvent.bind(this));
  }
  disconnectedCallback() {
    this.removeEventListener("click", this._clickedEvent.bind(this));
  }

  get style() {
    return `
      <style>
        :host button {
          all: unset;
          display: revert;
          box-sizing: border-box;
          width: 100%;
          cursor: pointer;
          padding: .5rem .8rem;
          font-family: var(--font-family, Tahoma, Geneva, Verdana, sans-serif);
          color: var(--color-tab-foreground, #414141);
          border-radius: 3px;
          outline: 1px solid transparent;
          outline-offset: -3px;
        }
        :host button:hover,
        :host button:focus-within,
        :host([aria-selected="true"]) button {
          color: var(--color-tab-foreground-active, #ffffff);
          outline: 2px solid var(--color-tab-background-active, #5A3A31);
          background-color: var(--color-tab-background-active, #5A3A31);
        }
        :host([aria-selected="true"]) {
          pointer-events: none;
        }
        :host([aria-selected="true"]) button {
          cursor: default;
        }
      </style>
    `;
  }
  render() {
    this.shadowRoot.innerHTML = `
      ${this.style}
      <button type="button"><slot>Default Tab</slot></button>
    `;
  }

  _clickedEvent() {
    this.dispatchEvent(
      new CustomEvent("tab-clicked", {
        bubbles: true,
        detail: { tab: () => this.tab },
      })
    );
  }
}

customElements.define("iga-tab-item", IgaTabItem);
