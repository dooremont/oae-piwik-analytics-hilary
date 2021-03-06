/*
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
 * visibilitys and limitations under the License.
 */

var _ = require('underscore');
var assert = require('assert');

var ConfigTestUtil = require('oae-config/lib/test/util');
var RestAPI = require('oae-rest');
var TestsUtil = require('oae-tests');

describe('Piwik Analytics', function() {

    // Rest context that can be used every time we need to make a request as an anonymous user
    var anonymousRestContext = null;
    // Rest context that can be used every time we need to make a request as a tenant admin
    var camAdminRestContext = null;

    /**
     * Function that initializes the REST contexts
     */
    before(function(callback) {
        // Fill up the rest context for the anonymous user
        anonymousRestContext = TestsUtil.createTenantRestContext(global.oaeTests.tenants.cam.host);
        // Fill up the rest context for the admin tenant
        camAdminRestContext = TestsUtil.createTenantAdminRestContext(global.oaeTests.tenants.cam.host);
        callback();
    });

    /**
     * Test that verifies that the Piwik Analytics config values are returned in the config feed
     */
    it('verify the config feed contains Piwik Analytics config values', function(callback) {
        // Create a regular user
        TestsUtil.generateTestUsers(camAdminRestContext, 1, function(err, users) {
            assert.ok(!err);
            var johnRestContext = _.values(users)[0].restContext;

            // Check that the Piwik Analytics config values are available in the config feed for a regular user
            RestAPI.Config.getTenantConfig(johnRestContext, null, function(err, config) {
                assert.ok(!err);
                assert.ok(config);
                assert.strictEqual(config['oae-piwik-analytics']['piwik-analytics']['globalEnabled'], false);
                assert.strictEqual(config['oae-piwik-analytics']['piwik-analytics']['globalTrackingId'], '');
                assert.strictEqual(config['oae-piwik-analytics']['piwik-analytics']['globalTrackingUrl'], '');

                // Check that the PiwikAnalytics config values are available in the config feed for a tenant admin
                RestAPI.Config.getTenantConfig(camAdminRestContext, null, function(err, config) {
                    assert.ok(!err);
                    assert.ok(config);
                    assert.strictEqual(config['oae-piwik-analytics']['piwik-analytics']['globalEnabled'], false);
                    assert.strictEqual(config['oae-piwik-analytics']['piwik-analytics']['globalTrackingId'], '');
                    assert.strictEqual(config['oae-piwik-analytics']['piwik-analytics']['globalTrackingUrl'], '');
                   

                    // Check that the Piwik Analytics config values are available in the config feed for an anonymous user
                    RestAPI.Config.getTenantConfig(anonymousRestContext, null, function(err, config) {
                        assert.ok(!err);
                        assert.ok(config);
                        assert.strictEqual(config['oae-piwik-analytics']['piwik-analytics']['globalEnabled'], false);
                        assert.strictEqual(config['oae-piwik-analytics']['piwik-analytics']['globalTrackingId'], '');
                        assert.strictEqual(config['oae-piwik-analytics']['piwik-analytics']['globalTrackingUrl'], '');
                        callback();
                    });
                });
            });
        });
    });
});
