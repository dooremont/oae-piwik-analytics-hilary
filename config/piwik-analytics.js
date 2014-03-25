/*!
 * Copyright 2014 Apereo Foundation (AF) Licensed under the
 * Educational Community License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may
 * obtain a copy of the License at
 *
 *     http://opensource.org/licenses/ECL-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an "AS IS"
 * BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */



var Fields = require('oae-config/lib/fields');

module.exports = {
    'title': 'OAE Piwik Analytics Module',
    'piwik-analytics': {
        'name': 'Piwik configuration',
        'description': 'Piwik configuration',
        'elements': {
            'globalEnabled': new Fields.Bool('Global Server Piwik enabled', 'Global Piwik Analytics enabled', false, {'tenantOverride': false}),
            'globalTrackingUrl': new Fields.Text('Global URL server Piwik', 'The Global Piwik Analytics URL', '', {'tenantOverride': false}),
            'globalTrackingId': new Fields.Text('Global Piwik tracking-ID', 'The Global Piwik Analytics ID', '', {'tenantOverride': false})

        }
    }
};
