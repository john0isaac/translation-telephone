import { html, css, nothing, LitElement } from "lit";

import { censoredStyle } from "./shared-styles.js";
import { SOURCES, LANGUAGES } from "./translation.js";

export class MessageTranslation extends LitElement {
  static properties = {
    translation: { type: String },
    language: { type: String },
    startLanguage: { type: String },
    source: { type: String },
    _showTranslateLink: { type: Boolean, state: true, default: false },
  };

  static styles = [
    censoredStyle,
    css`
      .translation {
        margin-bottom: 10px;
      }
      .language {
        font-weight: bold;
      }
      .message {
        background: white;
        padding: 3px 5px;
        border-radius: 3px;
      }
      .link {
        padding-left: 4px;
      }
    `,
  ];

  constructor() {
    super();
  }

  render() {
    let translateA;
    if (this.language != this.startLanguage) {
      const translateUrl = SOURCES[this.source].generateUrl(
        this.language,
        this.startLanguage,
        this.translation
      );
      translateA = this._showTranslateLink
        ? html`<a class="link" href=${translateUrl} target="_blank">
            → Translate to ${LANGUAGES[this.startLanguage]}</a
          >`
        : nothing;
    }
    const sourceName = SOURCES[this.source].name;
    const sourceUrl = SOURCES[this.source].homepage;
    return html`<div
      class="translation"
      @mouseenter=${() => (this._showTranslateLink = true)}
      @mouseleave=${() => (this._showTranslateLink = false)}
    >
      <div class="language">${LANGUAGES[this.language]}${translateA}</div>
      <div class="message censored">${this.translation}</div>
      <a href="${sourceUrl}">Translated by ${sourceName}</a>
    </div>`;
  }
}

customElements.define("message-translation", MessageTranslation);
