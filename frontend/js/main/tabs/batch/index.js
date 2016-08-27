import Matreshka from 'matreshka';
import getSandbox from '../tab/components/sandbox';
import getContent from './components/content';
import Tab from '../tab';
import LintEditor from '../../../linteditor';
import CodeMirror from 'codemirror';
import BatchItems from './batch-items';

export default class BatchTab extends Tab {
    constructor(...args) {
        super(...args)
            .jset({ items: [{}, {}] })
            .setClassFor({
                items: BatchItems
            })
            .bindNode('content', getContent(this))
            .bindSandbox(getSandbox(this))
            .on({
                tabfocus: () => {
                    // this.editor.focus();
                },
                'change:files': () => {
                    this.items.recreate(this.files.map(file => ({
                        value: file.readerResult
                    })));
                },
                'items@modify': () => this.trigger('modify')
            });
    }

    initialize() {
        this.items.rerender();
    }

    toJSON() {
        return this.items.map(item => encodeURIComponent(item.value));
    }

    fromJSON(value) {
        this.items.recreate(value.map(item => ({
            value: decodeURIComponent(item)
        })));

        return this;
    }
}
