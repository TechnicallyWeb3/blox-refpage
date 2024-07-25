-- Add initial users
CALL addUser("efac5eac-65e7-48f3-9bbd-296a300f295b", "efac5eac-65e7-48f3-9bbd-296a300f295b", "");
CALL setReferralCode("efac5eac-65e7-48f3-9bbd-296a300f295b", "ABCDE", True);

CALL addUser("f88b2f0a-b8f4-4d12-8d0c-e87a25dde7df", "f88b2f0a-b8f4-4d12-8d0c-e87a25dde7df", "ABCDE");
CALL setReferralCode("f88b2f0a-b8f4-4d12-8d0c-e87a25dde7df", "FGHIJ", True);

-- Adding more users to create referral chains
CALL addUser("7c9f3e1d-0e5f-4f95-bb8b-cc8bb2d8e312", "7c9f3e1d-0e5f-4f95-bb8b-cc8bb2d8e312", "FGHIJ");
CALL setReferralCode("7c9f3e1d-0e5f-4f95-bb8b-cc8bb2d8e312", "KLMNO", True);

CALL addUser("1a3e2b4d-2b4e-4b4b-b2c4-c4b2b4b2c4b2", "1a3e2b4d-2b4e-4b4b-b2c4-c4b2b4b2c4b2", "KLMNO");
CALL setReferralCode("1a3e2b4d-2b4e-4b4b-b2c4-c4b2b4b2c4b2", "PQRST", True);

CALL addUser("6d8e9f0a-1b2c-3d4e-5f6a-7b8c9d0e1f2g", "6d8e9f0a-1b2c-3d4e-5f6a-7b8c9d0e1f2g", "PQRST");
CALL setReferralCode("6d8e9f0a-1b2c-3d4e-5f6a-7b8c9d0e1f2g", "UVWXY", True);

CALL addUser("3b4c5d6e-7f8a-9b0c-1d2e-3f4g5h6i7j8k", "3b4c5d6e-7f8a-9b0c-1d2e-3f4g5h6i7j8k", "UVWXY");
CALL setReferralCode("3b4c5d6e-7f8a-9b0c-1d2e-3f4g5h6i7j8k", "ZABCD", True);

CALL addUser("0a1b2c3d-4e5f-6a7b-8c9d-0e1f2g3h4i5j", "0a1b2c3d-4e5f-6a7b-8c9d-0e1f2g3h4i5j", "ZABCD");
CALL setReferralCode("0a1b2c3d-4e5f-6a7b-8c9d-0e1f2g3h4i5j", "EFGHI", True);

-- Adding another chain for diversity
CALL addUser("b9c8d7e6-f5a4-3b2c-1d0e-2f3g4h5i6j7k", "b9c8d7e6-f5a4-3b2c-1d0e-2f3g4h5i6j7k", "");
CALL setReferralCode("b9c8d7e6-f5a4-3b2c-1d0e-2f3g4h5i6j7k", "JKLMN", True);

CALL addUser("k9j8i7h6-g5f4-3e2d-1c0b-2a3f4h5i6j7k", "k9j8i7h6-g5f4-3e2d-1c0b-2a3f4h5i6j7k", "JKLMN");
CALL setReferralCode("k9j8i7h6-g5f4-3e2d-1c0b-2a3f4h5i6j7k", "OPQRS", True);

CALL addUser("m9n8o7p6-q5r4-3s2t-1u0v-2w3x4y5z6a7b", "m9n8o7p6-q5r4-3s2t-1u0v-2w3x4y5z6a7b", "OPQRS");
CALL setReferralCode("m9n8o7p6-q5r4-3s2t-1u0v-2w3x4y5z6a7b", "TUVWX", True);
