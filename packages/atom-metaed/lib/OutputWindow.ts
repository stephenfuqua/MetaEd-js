import { MessagePanelView, PlainMessageView } from 'atom-message-panel';

export class OutputWindow {
  myOutputWindow: MessagePanelView;

  constructor() {
    this.myOutputWindow = null;
  }

  addMessage(message: string, raw: boolean = false) {
    this.ensureOutputWindowIsVisible();
    this.myOutputWindow.add(new PlainMessageView({ message, raw }));
    this.myOutputWindow.updateScroll();
  }

  clear() {
    if (this.myOutputWindow) {
      this.myOutputWindow.clear();
    }
  }

  ensureOutputWindowIsVisible() {
    if (!this.myOutputWindow) {
      const explicitSize = '170px';
      this.myOutputWindow = new MessagePanelView({
        title: 'MetaEd',
        autoScroll: true,
        maxHeight: explicitSize,
      });
      this.myOutputWindow.body.css({
        minHeight: explicitSize,
      });
    }
    this.myOutputWindow.attach();
    if (this.myOutputWindow.btnFold.hasClass('icon-unfold')) {
      this.myOutputWindow.toggle();
    }
  }

  dispose() {
    if (this.myOutputWindow) {
      this.myOutputWindow.close();
      this.myOutputWindow = null;
    }
  }
}
