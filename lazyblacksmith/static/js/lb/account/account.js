var accountDashboard = (function($, lb, utils, eveUtils, eveData) {
    "use strict";
    var regions = {};
    var currentScopes = [];
    var character_list = {null: 'None'};

    $.extend(lb.urls, {
        updatePreferenceUrl: false,
        loginUrl: false,
    });

    var inventionSettings = {
        facility: false,
        inventionRig: false,
        copyRig: false,
        security: false,
        system: false,
        priceRegion: false,
        priceType: false,
        characterId: null,
        copyImplant: false,
    };

    var researchSettings = {
        facility: false,
        meRig: false,
        teRig: false,
        copyRig: false,
        security: false,
        system: false,
        characterId: null,
        meImplant: false,
        teImplant: false,
        copyImplant: false,
    };

    var productionSettings = {
        facility: false,
        meRig: false,
        teRig: false,
        security: false,
        system: false,
        componentFacility: false,
        componentMeRig: false,
        componentTeRig: false,
        componentSecurity: false,
        componentSystem: false,
        priceMineralRegion: false,
        priceMineralType: false,
        pricePiRegion: false,
        pricePiType: false,
        priceMoongooRegion: false,
        priceMoongooType: false,
        priceOtherRegion: false,
        priceOtherType: false,
        characterId: null,
        teImplant: false,
    };

    var reactionSettings = {
        reactionFacility: false,
        reactionMeRig: false,
        reactionTeRig: false,
        reactionSecurity: false,
        reactionSystem: false,
        manufFacility: false,
        manufMeRig: false,
        manufTeRig: false,
        manufSecurity: false,
        manufSystem: false,
        manufTeImplant: false,
        priceRegion: false,
        priceType: false,
        characterId: null,
    }


    /* ---------------------------------------------------------------------- */
    /*                        ACCOUNT PREFERENCES                             */
    /* ---------------------------------------------------------------------- */

    /**
     * Init the checkbox for the scope selection (update the link)
     */
    var _initScopeInput = function() {
        $("input[name='scope']").on('change', function() {
            if($(this).is(':checked')) {
                currentScopes.push($(this).val());
            } else {
                currentScopes.splice($.inArray($(this).val(), currentScopes),1);
            }
            var url = lb.urls.loginUrl.replace(/SCOPE_REPLACE/, currentScopes.join());
            $('#update-scope').attr('href', url);
            $('#update-scope').toggleClass('disabled', (currentScopes.length == 0));
        });
    };


    /**
     * Init the scope deletion when the user want to remove a scope he currently have
     */
    var _initScopeActions = function() {
        $('.delete-scope').on('click', function() {
            var charId = parseInt($(this).attr('data-char-id'));
            var scope = $(this).attr('data-scope');
            utils.ajaxDeleteCallJson(
                lb.urls.deleteScopeUrl.replace(/SCOPE_REPLACE/, scope).replace(/123456789/, charId),
                function(success) {
                    utils.flashNotify('Scope deleted.', 'success');
                    $('#scope-'+charId+'[data-scope="'+scope+'"]').remove();
                },

                function(errorData) {
                    utils.flashNotify(errorData.responseJSON['message'], 'danger');
                }
            )
        });
    }


    /* ---------------------------------------------------------------------- */
    /*                       BLUEPRINT PREFERENCES                            */
    /* ---------------------------------------------------------------------- */

    /**
     * Init the invention settings reset button action
     */
    var _resetInventionSettings = function() {
        $('#btn-reset-invention').on('click', function(event) {
            $('#structure-time-rig-invention input[value='+inventionSettings.inventionRig+']').parent().button("toggle");
            $('#structure-copy-rig-invention input[value='+inventionSettings.copyRig+']').parent().button("toggle");
            $('#structure-sec-status-invention input[value='+inventionSettings.security+']').parent().button("toggle");
            $('#order-type-invention input[value='+inventionSettings.priceType+']').parent().button("toggle");
            $('#copy-implant-invention input[value="'+inventionSettings.copyImplant+'"]').parent().button("toggle");
            $('#facility-invention').val(inventionSettings.facility);
            $('#system-invention').val(inventionSettings.system);
            $("#region-invention").val(inventionSettings.priceRegion);


            var charId = (inventionSettings.characterId) ? inventionSettings.characterId : 0;
            $("#char-invention").val(charId);
        });
    }


    /**
     * Init the research settings reset button action
     */
    var _resetResearchSettings = function() {
        $('#btn-reset-research').on('click', function(event) {
            $('#structure-me-rig-research input[value='+researchSettings.meRig+']').parent().button("toggle");
            $('#structure-te-rig-research input[value='+researchSettings.teRig+']').parent().button("toggle");
            $('#structure-copy-rig-research input[value='+researchSettings.copyRig+']').parent().button("toggle");
            $('#structure-sec-status-research input[value='+researchSettings.security+']').parent().button("toggle");
            $('#me-implant-research input[value="'+researchSettings.meImplant+'"]').parent().button("toggle");
            $('#te-implant-research input[value="'+researchSettings.teImplant+'"]').parent().button("toggle");
            $('#copy-implant-research input[value="'+researchSettings.copyImplant+'"]').parent().button("toggle");
            $('#facility-research').val(researchSettings.facility);
            $('#system-research').val(researchSettings.system);

            var charId = (researchSettings.characterId) ? researchSettings.characterId : 0;
            $("#char-research").val(charId);
        });
    }


    /**
     * Init the prod settings reset button action
     */
    var _resetProdSettings = function() {
        $('#btn-reset-prod').on('click', function(event) {
            $('#structure-main-me-rig-prod input[value='+productionSettings.meRig+']').parent().button("toggle");
            $('#structure-main-te-rig-prod input[value='+productionSettings.teRig+']').parent().button("toggle");
            $('#structure-comp-me-rig-prod input[value='+productionSettings.componentMeRig+']').parent().button("toggle");
            $('#structure-comp-te-rig-prod input[value='+productionSettings.componentTeRig+']').parent().button("toggle");

            $('#structure-main-sec-status-prod input[value='+productionSettings.security+']').parent().button("toggle");
            $('#structure-comp-sec-status-prod input[value='+productionSettings.componentSecurity+']').parent().button("toggle");

            $('#order-type-mineral-prod input[value='+productionSettings.priceMineralType+']').parent().button("toggle");
            $('#order-type-pi-prod input[value='+productionSettings.pricePiType+']').parent().button("toggle");
            $('#order-type-moongoo-prod input[value='+productionSettings.priceMoongooType+']').parent().button("toggle");
            $('#order-type-others-prod input[value='+productionSettings.priceOtherType+']').parent().button("toggle");

            $("#region-mineral-prod").val(productionSettings.priceMineralRegion);
            $("#region-pi-prod").val(productionSettings.pricePiRegion);
            $("#region-moongoo-prod").val(productionSettings.priceMoongooRegion);
            $("#region-others-prod").val(productionSettings.priceOtherRegion);

            $('#main-system-prod').val(productionSettings.system);
            $('#comp-system-prod').val(productionSettings.componentSystem);

            $('#main-facility-prod').val(productionSettings.facility)
            $('#comp-facility-prod').val(productionSettings.componentFacility);

            $('#te-implant-prod input[value="'+productionSettings.teImplant+'"]').parent().button("toggle");

            var charId = (productionSettings.characterId) ? productionSettings.characterId : 0;
            $("#char-prod").val(charId);
        });
    };

    /**
     * Init the reaction settings reset button action
     */
    var _resetReactionSettings = function() {
        $('#btn-reset-reaction').on('click', function(event) {
            $('#me-rig-reaction input[value='+reactionSettings.reactionMeRig+']').parent().button("toggle");
            $('#te-rig-reaction input[value='+reactionSettings.reactionTeRig+']').parent().button("toggle");
            $('#manufacturing-me-rig-reaction input[value='+reactionSettings.manufMeRig+']').parent().button("toggle");
            $('#manufacturing-te-rig-reaction input[value='+reactionSettings.manufTeRig+']').parent().button("toggle");

            $('#sec-status-reaction input[value='+reactionSettings.reactionSecurity+']').parent().button("toggle");
            $('#manufacturing-sec-status-reaction input[value='+reactionSettings.manufSecurity+']').parent().button("toggle");

            $('#order-type-reaction input[value='+reactionSettings.priceType+']').parent().button("toggle");
            $("#region-reaction").val(reactionSettings.priceRegion);

            $('#system-reaction').val(reactionSettings.reactionSystem);
            $('#manufacturing-system-reaction').val(reactionSettings.manufSystem);

            $('#facility-reaction').val(reactionSettings.reactionFacility)
            $('#manufacturing-facility-reaction').val(reactionSettings.manufFacility);

            $('#te-implant-reaction input[value="'+reactionSettings.manufTeImplant+'"]').parent().button("toggle");

            var charId = (reactionSettings.characterId) ? reactionSettings.characterId : 0;
            $("#char-reaction").val(charId);
        });
    };

    /**
     * Reaction save event.
     * Send a POST call to the backend to set the new settings
     */
    var _saveReactionSettings = function(event) {
        $('#btn-save-reaction').on('click', function(event) {
            var charId = $("#char-reaction").val();
            var reactionSettingsTmp = {
                reactionFacility: parseInt($('#facility-reaction').val()),
                reactionMeRig: parseInt($('#me-rig-reaction input:checked').val()),
                reactionTeRig: parseInt($('#te-rig-reaction input:checked').val()),
                reactionSecurity: $('#sec-status-reaction input:checked').val(),
                reactionSystem: $('#system-reaction').val(),
                manufFacility: parseInt($('#manufacturing-facility-reaction').val()),
                manufMeRig: parseInt($('#manufacturing-me-rig-reaction input:checked').val()),
                manufTeRig: parseInt($('#manufacturing-te-rig-reaction input:checked').val()),
                manufSecurity: $('#manufacturing-sec-status-reaction input:checked').val(),
                manufSystem: $('#manufacturing-system-reaction').val(),
                manufTeImplant: $('#te-implant-reaction input:checked').val(),
                priceRegion: parseInt($("#region-reaction").val()),
                priceType: $('#order-type-reaction input:checked').val(),
                characterId: (charId == '0') ? null : charId,
            }

            utils.ajaxPostCallJson(
                lb.urls.updatePreferenceUrl,
                JSON.stringify({reaction: reactionSettingsTmp}),
                function(data) {
                    utils.flashNotify(data.message, data.status);
                    if(data.status != 'success') {
                        reactionSettingsTmp.reactionSystem = reactionSettings.reactionSystem;
                        reactionSettingsTmp.manufSystem = reactionSettings.manufSystem;
                    }
                    reactionSettings = reactionSettingsTmp;
                },
                function(errorData) {
                    utils.flashNotify(errorData.responseJSON['message'], 'danger');
                }
            )
        });
    };


    /**
     * Production save event.
     * Send a POST call to the backend to set the new settings
     */
    var _saveProdSettings = function(event) {
        $('#btn-save-prod').on('click', function(event) {
            var charId = $("#char-prod").val();

            var productionSettingsTmp = {
                facility: parseInt($('#main-facility-prod').val()),
                meRig: parseInt($('#structure-main-me-rig-prod input:checked').val()),
                teRig: parseInt($('#structure-main-te-rig-prod input:checked').val()),
                security: $('#structure-main-sec-status-prod input:checked').val(),
                system: $('#main-system-prod').val(),
                componentFacility: parseInt($('#comp-facility-prod').val()),
                componentMeRig: parseInt($('#structure-comp-me-rig-prod input:checked').val()),
                componentTeRig: parseInt($('#structure-comp-te-rig-prod input:checked').val()),
                componentSecurity: $('#structure-comp-sec-status-prod input:checked').val(),
                componentSystem: $('#comp-system-prod').val(),
                priceMineralRegion: parseInt($("#region-mineral-prod").val()),
                priceMineralType: $('#order-type-mineral-prod input:checked').val(),
                pricePiRegion: parseInt($("#region-pi-prod").val()),
                pricePiType: $('#order-type-pi-prod input:checked').val(),
                priceMoongooRegion: parseInt($("#region-moongoo-prod").val()),
                priceMoongooType: $('#order-type-moongoo-prod input:checked').val(),
                priceOtherRegion: parseInt($("#region-others-prod").val()),
                priceOtherType: $('#order-type-others-prod input:checked').val(),
                characterId: (charId == '0') ? null : charId,
                teImplant: $('#te-implant-prod input:checked').val(),
            };

            utils.ajaxPostCallJson(
                lb.urls.updatePreferenceUrl,
                JSON.stringify({production: productionSettingsTmp}),
                function(data) {
                    utils.flashNotify(data.message, data.status);
                    if(data.status != 'success') {
                        productionSettingsTmp.system = productionSettings.system;
                        productionSettingsTmp.componentSystem = productionSettings.componentSystem;
                    }
                    productionSettings = productionSettingsTmp;
                },
                function(errorData) {
                    utils.flashNotify(errorData.responseJSON['message'], 'danger');
                }
            )
        });
    };


    /**
     * Research modal apply event.
     * Send a POST call to the backend to set the new settings
     */
    var _saveResearchSettings = function(event) {
        $('#btn-save-research').on('click', function(event) {
            var charId = $("#char-research").val();
            var researchSettingsTmp = {
                facility: parseInt($('#facility-research').val()),
                meRig: parseInt($('#structure-me-rig-research input:checked').val()),
                teRig: parseInt($('#structure-te-rig-research input:checked').val()),
                copyRig: parseInt($('#structure-copy-rig-research input:checked').val()),
                security: $('#structure-sec-status-research input:checked').val(),
                system: $('#system-research').val(),
                characterId: (charId == '0') ? null : charId,
                meImplant: $('#me-implant-research input:checked').val(),
                teImplant: $('#te-implant-research input:checked').val(),
                copyImplant: $('#copy-implant-research input:checked').val(),
            };

            utils.ajaxPostCallJson(
                lb.urls.updatePreferenceUrl,
                JSON.stringify({research: researchSettingsTmp}),
                function(data) {
                    utils.flashNotify(data.message, data.status);
                    if(data.status != 'success') {
                        researchSettingsTmp.system = researchSettings.system;
                    }
                    researchSettings = researchSettingsTmp;
                },
                function(errorData) {
                    utils.flashNotify(errorData.responseJSON['message'], 'danger');
                }
            )
        });
    };


    /**
     * Invention modal apply event.
     * Send a POST call to the backend to set the new settings
     */
    var _saveInventionSettings = function(event) {
        $('#btn-save-invention').on('click', function(event) {
            var charId = $("#char-invention").val();
            var inventionSettingsTmp = {
                facility: parseInt($('#facility-invention').val()),
                inventionRig: parseInt($('#structure-time-rig-invention input:checked').val()),
                copyRig: parseInt($('#structure-copy-rig-invention input:checked').val()),
                security: $('#structure-sec-status-invention input:checked').val(),
                system: $('#system-invention').val(),
                priceRegion: parseInt($("#region-invention").val()),
                priceType: $('#order-type-invention input:checked').val(),
                characterId: (charId == '0') ? null : charId,
                copyImplant: $('#copy-implant-invention input:checked').val(),
            };

            utils.ajaxPostCallJson(
                lb.urls.updatePreferenceUrl,
                JSON.stringify({invention: inventionSettingsTmp}),
                function(data) {
                    utils.flashNotify(data.message, data.status);
                    if(data.status != 'success') {
                        researchSettingsTmp.system = inventionSettings.system;
                    }
                    inventionSettings = inventionSettingsTmp;
                },
                function(errorData) {
                    utils.flashNotify(errorData.responseJSON['message'], 'danger');
                }
            )
        });
    };

    /**
     * 
     */
    var _initPurgeActions = function() {
        $('#delete-char-skills').on('click', function() { 
            _askConfirmation("all characters skills",
                             lb.urls.purgeSkillsUrl,
                             false)
        });
        $('#delete-char-bp').on('click',function() { 
            _askConfirmation("all characters blueprints",
                             lb.urls.purgeCharBpUrl,
                             false)
        });
        $('#delete-corp-bp').on('click',function() { 
            _askConfirmation("all corporations blueprints",
                             lb.urls.purgeCorpBpUrl,
                             false)
        });
        $('#delete-account').on('click',function() { 
            _askConfirmation("your account",
                             lb.urls.deleteAccountUrl,
                             true)
        });
    }

    var _askConfirmation = function(element, url, reload) {
        $("#confirm-modal #modal-confirm-element").html(element);
        $("#confirm-modal").modal('show');
        $("#confirm-modal #modal-confirm").on('click', function(event) {
            _callPurgeAction(url, reload);
            $(this).off('click');
            $("#confirm-modal").modal('hide');
        })
    }

    var _callPurgeAction = function(url, reload) {
        utils.ajaxDeleteCallJson(
            url,
            function(json) {
                utils.flashNotify(json['message'], json['status']);
                if(reload) {
                    window.location.replace(lb.urls.index);
                }
            },

            function(errorData) {
                utils.flashNotify(errorData.responseJSON['message'], 'danger');
            }
        )

    }
        $('.delete-scope').on('click', function() {
            var charId = parseInt($(this).attr('data-char-id'));
            var scope = $(this).attr('data-scope');
            utils.ajaxDeleteCallJson(
                lb.urls.deleteScopeUrl.replace(/SCOPE_REPLACE/, scope).replace(/123456789/, charId),
                function(success) {
                    utils.flashNotify('Scope deleted.', 'success');
                    $('#scope-'+charId+'[data-scope="'+scope+'"]').remove();
                },

                function(errorData) {
                    utils.flashNotify(errorData.responseJSON['message'], 'danger');
                }
            )
        });

    /**
     * Init all buttons
     * @private
     */
    var _initFormButtons = function() {
        _resetInventionSettings();
        _resetResearchSettings();
        _resetProdSettings();
        _resetReactionSettings();
        _saveInventionSettings();
        _saveResearchSettings();
        _saveProdSettings();
        _saveReactionSettings();
    };

    /**
     * Init the solarsystem typeahead
     */
    var _initTypeahead = function() {
        eveUtils.initSolarSystemTypeahead('#main-system-prod');
        eveUtils.initSolarSystemTypeahead('#comp-system-prod');
        eveUtils.initSolarSystemTypeahead('#system-research');
        eveUtils.initSolarSystemTypeahead('#system-invention');
        eveUtils.initSolarSystemTypeahead('#system-reaction');
        eveUtils.initSolarSystemTypeahead('#manufacturing-system-reaction');
    };

    /**
     * Runner function
     */
    var run = function() {
        _initFormButtons();
        _initTypeahead();
        _initScopeInput();
        _initScopeActions();
        _initPurgeActions();
        $('[data-toggle="tooltip"]').tooltip();
    };

    // -------------------------------------------------
    // return object
    //
    return {
        // functions
        run: run,
        inventionSettings: inventionSettings,
        researchSettings: researchSettings,
        productionSettings: productionSettings,
        reactionSettings: reactionSettings,
        regions:regions,
        character_list: character_list,
    };
})(jQuery, lb, utils, eveUtils, eveData);

lb.registerModule('accountDashboard', accountDashboard);
