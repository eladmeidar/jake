/**
 * <p>The <tt>ContentOverlay</tt> class extends <tt>Overlay</tt> and provides the most generally
 * useful form of overlay. Much of its API it inherits from <tt>Overlay</tt>, but it provides a
 * few methods for dealing with changing the HTML content of an overlay. The markup generated by
 * the constructor is slightly different, as it contains an extra element for holding the content:</p>
 *
 * <pre><code>     &lt;div class="overlay-container"&gt;
 *         &lt;div class="overlay-content"&gt;
 *             &lt;!-- Content goes here -- &gt;
 *         &lt/div&gt;
 *     &lt;/div&gt;</code></pre>
 *
 * @constructor
 * @class ContentOverlay
 */
Ojay.ContentOverlay = new JS.Class(Ojay.Overlay, /** @scope Ojay.ContentOverlay.prototype */{
    extend: /** @scope Ojay.ContentOverlay */{
        CONTENT_CLASS:      'overlay-content'
    },
    
    /**
     * <p>Initializes the overlay. Options are the same as for <tt>Overlay</tt> with one
     * addition: <tt>content</tt> specifies the initial HTML content of the overlay.</p>
     * @params {Object} options
     */
    initialize: function(options) {
        this.callSuper();
        this.setContent(this._options.content);
    },
    
    /**
     * <p>Returns a <tt>DomCollection</tt> wrapping the HTML elements for the overlay.</p>
     * @returns {DomCollection}
     */
    getHTML: function() {
        var self = this, elements = self._elements;
        if (elements._content) return elements._container;
        var container = this.callSuper().node, builder = new Ojay.HtmlBuilder(container);
        elements._content = Ojay( builder.div({className: self.klass.CONTENT_CLASS}) );
        return elements._container;
    },
    
    /**
     * <p>Sets the content of the overlay. May be a string or an <tt>HTMLElement</tt>.</p>
     * @param {String|HTMLElement} content
     * @returns {Overlay}
     */
    setContent: function(content) {
        if (this.inState('CLOSED')) return this;
        this._elements._content.setContent(content || '');
        return this;
    },
    
    /**
     * <p>Returns a reference to the content-holding element of the overlay, wrapped in
     * a <tt>DomCollection.</tt>
     * @returns {DomCollection}
     */
    getContentElement: function() {
        return this._elements._content;
    },
    
    /**
     * <p>Inserts new content into the overlay, using the same syntax as for
     * <tt>DomCollection#insert()</tt>.</p>
     * @param {String|HTMLElement} content
     * @param {String} position
     * @returns {Overlay}
     */
    insert: function(content, position) {
        if (this.inState('CLOSED')) return this;
        this._elements._content.insert(content, position);
        return this;
    },
    
    states: /** @scope Ojay.ContentOverlay.prototype */{
        
        /**
         * <p>An overlay is in the INVISIBLE state when it is present in the document
         * but is not visible.</p>
         */
        INVISIBLE: /** @scope Ojay.ContentOverlay.prototype */{
            /**
             * <p>Sets the size of the overlay to just contain its content.</p>
             * @returns {ContentOverlay}
             */
            fitToContent: whileHidden('fitToContent')
        },
        
        /**
         * <p>An overlay is in the VISIBLE state when it is present in the document
         * and visible.</p>
         */
        VISIBLE: /** @scope Ojay.ContentOverlay.prototype */{
            /**
             * <p>Sets the size of the overlay to just contain its content.</p>
             * @returns {ContentOverlay}
             */
            fitToContent: function() {
                var region = this._elements._content.getRegion();
                return this.setSize(region.getWidth(), region.getHeight());
    }   }   }
});