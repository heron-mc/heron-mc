/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * 
 * Author: Eddy Scheper, ARIS B.V./OGG
 */

// Define App namespace.
Ext.namespace("App");

//---------------------------------------------------------------------------
// Show Help window.
App.btn_HelpClicked = function () {
    if (!App.helpWin) {
        App.helpWin = new App.HelpWindow();
    }
    App.helpWin.show();
};

//---------------------------------------------------------------------------
App.HelpWindow = Ext.extend(Ext.Window, {

    //---------------------------------------------------------------------------
    initComponent: function () {

        var s = "";
         s += "<h1>Help</h1>";
         s += "Dit is de help van de applicatie.";
         s += "<ul>";
         s += "<li>Inhoud</li>";
         s += "<li>FAQ</li>";
         s += "</ul>";

        var panel = new Ext.Panel({
            bodyStyle: "padding:5px;",
            autoScroll: true,
            html: s,
            preventBodyReset: true
        });

        var config = {
            title: "Help",
            modal: true,
            width: 600,
            height: 400,
            layout: "fit",
            plain: true,
            border: false,
            buttonAlign: "center",
            resizable: true,
            closeAction: "hide",
            buttons: [
                {
                    text: "Sluiten",
                    handler: function () {
                        this.hide();
                    },
                    scope: this
                }
            ],
            items: [panel]
        };

        Ext.apply(this, config);

        App.HelpWindow.superclass.initComponent.apply(this);
    }
});
