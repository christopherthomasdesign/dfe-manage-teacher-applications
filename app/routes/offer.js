const utils = require('../data/application-utils')

module.exports = router => {

  router.get('/application/:applicationId/offer', (req, res) => {
    const applicationId = req.params.applicationId
    const application = req.session.data.applications.find(app => app.id === applicationId)

    const flashMessage = utils.getFlashMessage({
      flash: req.flash('success'),
      overrideValue: req.query.flash,
      map: {
        'offer-withdrawn': 'Offer successfully withdrawn',
        'conditions-met': 'Conditions successfully marked as met',
        'conditions-not-met': 'Conditions successfully marked as not met',
        offered: 'Success: offer made',
        rejected: 'Application successfully rejected',
        'change-offer-location': 'Offer successfully changed ',
        'change-offer-course': 'Offer successfully changed ',
        'change-offer-provider': 'Offer successfully changed ',
        'change-condition-status-to-met': 'Condition successfully updated to met',
        'change-condition-status-to-not-met': 'Condition successfully updated to not met',
        'offer-made-to-new-provider': 'Success: offer made',
        'offer-made-to-new-course': 'Success: offer made',
        'offer-made-to-new-location': 'Success: offer made',
        'offer-reconfirmed': 'Deferred offer successfully confirmed for current cycle',
        'offer-deferred': 'Offer successfully deferred',
      }
    })

    res.render('application/offer/index', {
      application,
      conditions: utils.getConditions(application),
      flash: flashMessage
    })
  })

  router.get('/application/:applicationId/offer/defer/check', (req, res) => {
    res.render('application/offer/defer/check', {
      application: req.session.data.applications.find(app => app.id === req.params.applicationId)
    })
  })

  router.post('/application/:applicationId/offer/defer/check', (req, res) => {
    const applicationId = req.params.applicationId
    const application = req.session.data.applications.find(app => app.id === applicationId)
    application.status = 'Deferred'
    application.events.items.push({
      date: new Date().toISOString(),
      user: "Alicia Grenada",
      title: "Offer deferred"
    })

    req.flash('success', 'offer-deferred')
    res.redirect(`/application/${applicationId}/offer`)
  })




}
