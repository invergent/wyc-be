import services from '../../Features/utilities/services';

const { ClaimService } = services;

class ClaimAccessControl {
  static async validateClaimAccess(req, res, next) {
    const { currentStaff: { staffId }, params: { claimId } } = req;
    const claim = await ClaimService.findClaimByPk(claimId, ['claimer']);
    if (!claim) return res.status(404).json({ message: 'Claim does not exist.' });
    if (claim.claimer.staffId !== staffId) {
      return res.status(401).json({ message: 'You do not have access to this claim.' });
    }
    req.claim = claim.toJSON();
    return next();
  }
}

export default ClaimAccessControl;
