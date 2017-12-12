"use babel"

import ConciseBodyDebugView from "./concise-body-debug-view"
import { CompositeDisposable } from "atom"

export default {

  conciseBodyDebugView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.conciseBodyDebugView = new ConciseBodyDebugView(state.conciseBodyDebugViewState)
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.conciseBodyDebugView.getElement(),
      visible: false
    })

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add("atom-workspace", {
      "concise-body-debug:toggle": () => this.toggle()
    }))
  },

  deactivate() {
    this.modalPanel.destroy()
    this.subscriptions.dispose()
    this.conciseBodyDebugView.destroy()
  },

  serialize() {
    return {
      conciseBodyDebugViewState: this.conciseBodyDebugView.serialize()
    }
  },

  toggle() {
    console.log("ConciseBodyDebug was toggled!")
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    )
  }

}
