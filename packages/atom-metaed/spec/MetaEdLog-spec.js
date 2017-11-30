'use babel';

import MetaEdLog from '../lib/MetaEdLog';

describe('MetaEdLog', () => {
  let metaEdLog;
  let testPanel;

  beforeEach(() => {
    metaEdLog = new MetaEdLog();
    testPanel = jasmine.createSpyObj('TestPanel', ['add', 'attach', 'clear', 'close', 'toggle', 'updateScroll']);
    testPanel.body = jasmine.createSpyObj('body', ['css']);
    testPanel.btnFold = jasmine.createSpyObj('btnFold', ['hasClass']);
  });

  describe('.addMessage()', () => {
    it('adds message with no raw indicator', () => {
      metaEdLog._outputWindow = testPanel;
      spyOn(metaEdLog, 'ensureOutputWindowIsVisible');
      const message = 'Test Message';
      metaEdLog.addMessage(message);

      expect(metaEdLog.ensureOutputWindowIsVisible).toHaveBeenCalled();
      // Old style Jasmine syntax using calls and args instead of jasmine.objectContaining
      // because Atom is stuck on Jasmine 1.3 that doesn't support it
      expect(testPanel.add.calls[0].args[0].message).toEqual(message);
      expect(testPanel.add.calls[0].args[0].raw).toEqual(false);
      expect(testPanel.updateScroll).toHaveBeenCalled();
    });

    it('adds message with raw indicator', () => {
      metaEdLog._outputWindow = testPanel;
      spyOn(metaEdLog, 'ensureOutputWindowIsVisible');
      const message = 'Test Message';
      metaEdLog.addMessage(message, true);

      expect(metaEdLog.ensureOutputWindowIsVisible).toHaveBeenCalled();
      expect(testPanel.add).toHaveBeenCalled();
      // Old style Jasmine syntax using calls and args instead of jasmine.objectContaining
      // because Atom is stuck on Jasmine 1.3 that doesn't support it
      expect(testPanel.add.calls[0].args[0].message).toEqual(message);
      expect(testPanel.add.calls[0].args[0].raw).toEqual(true);
      expect(testPanel.updateScroll).toHaveBeenCalled();
    });
  });

  describe('.clear()', () => {
    it('clear does not throw if window has not been initialized', () => {
      metaEdLog._outputWindow = undefined;
      // Should not throw an exception for an undefined outputWindow
      metaEdLog.clear();
    });

    it('clears the window if window has been initialized', () => {
      metaEdLog._outputWindow = testPanel;
      metaEdLog.clear();

      expect(testPanel.clear).toHaveBeenCalled();
    });
  });

  describe('.ensureOutputWindowIsVisible()', () => {
    it('initializes window if has not been initialized', () => {
      metaEdLog.ensureOutputWindowIsVisible();

      expect(metaEdLog._outputWindow).not.toBeUndefined();
      expect(metaEdLog._outputWindow.title).toEqual('MetaEd');
      expect(metaEdLog._outputWindow.autoScroll).toEqual(true);
    });

    it('skips window initialization if has been already initialized and is expanded', () => {
      testPanel.btnFold.hasClass.andReturn(false);
      metaEdLog._outputWindow = testPanel;
      metaEdLog.ensureOutputWindowIsVisible();

      expect(testPanel.body.css).not.toHaveBeenCalled();
      expect(testPanel.attach).toHaveBeenCalled();
      expect(testPanel.toggle).not.toHaveBeenCalled();
    });

    it('toggles window if has been already initialized and is collapsed', () => {
      testPanel.btnFold.hasClass.andReturn(true);
      metaEdLog._outputWindow = testPanel;
      metaEdLog.ensureOutputWindowIsVisible();

      expect(testPanel.body.css).not.toHaveBeenCalled();
      expect(testPanel.attach).toHaveBeenCalled();
      expect(testPanel.toggle).toHaveBeenCalled();
    });
  });

  describe('.dispose()', () => {
    it('dispose does not throw if window has not been initialized', () => {
      metaEdLog._outputWindow = undefined;
      // Should not throw an exception for an undefined outputWindow
      metaEdLog.dispose();
    });

    it('closes the window if window has been initialized', () => {
      metaEdLog._outputWindow = testPanel;
      metaEdLog.dispose();

      expect(testPanel.close).toHaveBeenCalled();
    });
  });
});
