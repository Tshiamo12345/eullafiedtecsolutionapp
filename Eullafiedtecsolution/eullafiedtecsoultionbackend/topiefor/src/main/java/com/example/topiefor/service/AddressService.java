package com.example.topiefor.service;

import com.example.topiefor.exception.NotFoundException;
import com.example.topiefor.exception.ServerException;
import com.example.topiefor.model.Address;
import com.example.topiefor.repository.AddressRepo;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AddressService {

    private final Logger logger = LoggerFactory.getLogger(AddressService.class);
    @Autowired
    private final AddressRepo addressRepo;

    public AddressService(AddressRepo addressRepo) {
        this.addressRepo = addressRepo;
    }

    @Transactional
    public void deleteAddress(String addressId) throws Exception, NotFoundException {

        try {

            Optional<Address> optionalAddress = addressRepo.findById(addressId);

            if (optionalAddress.isPresent()) {
                logger.info("The address of the company is found ");
                Address address = optionalAddress.get();
                addressRepo.delete(address);
                logger.info("The address has been deleted: {}", address);
            } else {
                logger.error("The company not found with address: {}", addressId);
                throw new NotFoundException("The Company with Address is not found");
            }

        } catch (Exception ex) {
            logger.error("Something went wrong with server ");
            throw new ServerException("Something went wrong with the server");
        }

    }
    @Transactional
    public Address addAddress(Address address) throws Exception {

        try {

            logger.info("About to save the address to database {} ", address);
            addressRepo.save(address);
            logger.info("Method executed nicely when adding address to the database ");
            return address;

        } catch (Exception ex) {
            logger.error("Something went wrong with server method failed to add to database ", ex);
            throw new ServerException("Something went wrong with the server method");
        }


    }


}
